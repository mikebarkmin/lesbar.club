from flask import Flask, request, jsonify, render_template, send_from_directory
from flask_cors import CORS
import os
import re
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
    CORS(app)

    @app.route("/api/v1/languages", methods=["GET"])
    def languages():
        return jsonify({"languages": [k for k, v in supported_languages.items()]})

    @app.route("/api/v1/lesbar", methods=["POST"])
    def lesbar():
        json = request.get_json()

        if not json or not json.get("text"):
            return jsonify({"message": "Missing text"}), 400

        language = json.get("language", default_language)
        if language not in supported_languages:
            codes = [k for k, v in supported_languages.items()]
            return (
                jsonify(
                    {
                        "message": f"Language not supported only {''.join(codes)} are valid."
                    }
                ),
                400,
            )

        res_text = json.get("text")
        text = Text(res_text, lang=language)

        res_json = {
            "results": {
                "lesbar": {
                    **wiener_sachtext_formel(text),
                    **flesh_reading_ease(text),
                    **gunning_fog_index(text),
                    **dale_chall(text),
                    **lix(text),
                },
                "text": text.to_dict(),
            }
        }

        if text.detected_lang != language[0:2]:
            alt_language = [
                k for k in supported_languages if re.match(text.detected_lang, k)
            ]
            if alt_language:
                alt_language = alt_language[0]
                alt_text = Text(res_text, alt_language)

                res_json["alt_results"] = {
                    "lesbar": {
                        **wiener_sachtext_formel(alt_text),
                        **flesh_reading_ease(alt_text),
                        **gunning_fog_index(alt_text),
                        **dale_chall(alt_text),
                        **lix(alt_text),
                    },
                    "text": alt_text.to_dict(),
                }

        return jsonify(res_json)

    return app
