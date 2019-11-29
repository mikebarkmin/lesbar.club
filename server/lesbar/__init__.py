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
    "de_DE": {"formulas": [wiener_sachtext_formel, flesh_reading_ease, lix]},
    "en_GB": {"formulas": [flesh_reading_ease, gunning_fog_index, dale_chall]},
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
        lesbar = {}
        for forumla in supported_languages[language]["formulas"]:
            lesbar = {**lesbar, **forumla(text)}

        res_json = {"results": {"lesbar": lesbar, "text": text.to_dict()}}

        if text.detected_lang != language[0:2]:
            alt_language = [
                k for k in supported_languages if re.match(text.detected_lang, k)
            ]
            if alt_language:
                alt_language = alt_language[0]
                alt_text = Text(res_text, lang=alt_language)
                lesbar = {}
                for forumla in supported_languages[alt_language]["formulas"]:
                    lesbar = {**lesbar, **forumla(alt_text)}

                res_json["alt_results"] = {"lesbar": lesbar, "text": alt_text.to_dict()}

        return jsonify(res_json)

    return app
