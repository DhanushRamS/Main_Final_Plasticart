# app.py
from flask import Flask, request, jsonify
import os

from predictor import predict_external_image
from flask_cors import CORS, cross_origin

app = Flask(__name__)
cors = CORS(app)


@cross_origin
@app.route("/")
def hello():
    return "Hello World!"


@cross_origin
@app.route("/upload", methods=["POST"])
def upload_image():
    try:
        uploaded_file = request.files["image"]
        if uploaded_file.filename != "":
            # Save the uploaded file temporarily (you can choose a different location)
            temp_path = "temp_image.jpg"
            uploaded_file.save(temp_path)

            # Get the file size
            prediction = predict_external_image(temp_path)  # in bytes

            # Clean up: remove the temporary file
            os.remove(temp_path)

            print("Got image", prediction)
            return jsonify(
                {
                    "prediction": prediction,
                    "lat": request.form.get("lat", "0"),
                    "long": request.form.get("long", "0"),
                    "status": "ok",
                }
            )
        else:
            return "No file uploaded."
    except Exception as e:
        print(e)
        return f"Error: {str(e)}"


if __name__ == "__main__":
    app.run(debug=True, port=4000)
