import sentry_sdk
from sentry_sdk.integrations.flask import FlaskIntegration
from lesbar import create_app

sentry_sdk.init(
    dsn="https://b2d8172ecb894f61a9a322788591c172@sentry.io/1540715",
    integrations=[FlaskIntegration()],
)

app = create_app()

if __name__ == "__main__":
    # Only for debugging while developing
    app.run(host="0.0.0.0", debug=True, port=8000)
