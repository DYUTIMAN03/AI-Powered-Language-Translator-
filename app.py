from flask import Flask, request, jsonify
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM, pipeline
from flask_cors import CORS  # Import CORS

# Initialize Flask app
app = Flask(__name__)

# Enable CORS for the entire app
CORS(app)

# Load model and tokenizer once during startup
model_name = "facebook/nllb-200-distilled-600M"
model = AutoModelForSeq2SeqLM.from_pretrained(model_name)
tokenizer = AutoTokenizer.from_pretrained(model_name)

# Define a route for translation
@app.route('/translate', methods=['POST'])
def translate():
    try:
        # Get JSON data from request
        data = request.json
        text_to_translate = data.get('text')
        src_lang = data.get('src_lang')
        tgt_lang = data.get('tgt_lang')

        if not text_to_translate or not src_lang or not tgt_lang:
            return jsonify({"error": "Missing required fields"}), 400

        # Initialize a pipeline with the dynamic source and target languages
        translator = pipeline(
            "translation", model=model, tokenizer=tokenizer, src_lang=src_lang, tgt_lang=tgt_lang
        )

        # Perform translation
        translated_text = translator(text_to_translate, max_length=400)
        return jsonify({"translated_text": translated_text[0]['translation_text']})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True)

