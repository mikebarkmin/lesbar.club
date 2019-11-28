import os
import sentry_sdk
from sentry_sdk.integrations.flask import FlaskIntegration
from lesbar import create_app

if os.getenv("FLASK_ENV") == "producation" and os.getenv("SENTRY_DSN"):
    sentry_sdk.init(dsn=os.getenv("SENTRY_DSN"), integrations=[FlaskIntegration()])

app = create_app()

if __name__ == "__main__":
    # Only for debugging while developing
    app.run(host="0.0.0.0", debug=True, port=8000)
