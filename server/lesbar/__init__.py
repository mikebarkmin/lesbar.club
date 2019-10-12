from flask import Flask, request, jsonify, render_template
from lesbar.text import Text
from lesbar.formulas import (
    wiener_sachtext_formel,
    flesh_reading_ease,
    gunning_fog_index,
    dale_chall,
    lix,
)

supported_languages = {
    "de_DE": {"label": "Deutsch"},
    "en_GB": {"label": "English (GB)"},
    "en_US": {"label": "English (US)"},
}

default_language = "de_DE"


def create_app():

    app = Flask(__name__)

    @app.route("/", methods=["GET"])
    def index():
        return render_template(
            "index.html",
            supported_languages=supported_languages,
            default_language=default_language,
        )

    @app.route("/api/v1/lesbar", methods=["POST"])
    def lesbar():
        json = request.get_json()

        if not json or not json.get("text"):
            return jsonify({"message": "Missing text"}), 400

        language = json.get("language", default_language)
        if language not in supported_languages:
            return (
                jsonify(
                    {
                        "message": "Language not supported only en_GB, en_US and de_DE are valid."
                    }
                ),
                400,
            )

        text = json.get("text")
        text = Text(text, lang=language)

        return jsonify(
            {
                "lesbar": {
                    **wiener_sachtext_formel(text),
                    **flesh_reading_ease(text),
                    **gunning_fog_index(text),
                    **dale_chall(text),
                    **lix(text),
                },
                "text": text.to_dict(),
            }
        )

    return app
