"""Dev server that refuses to let the browser cache anything.

python tools/serve.py    ->  http://localhost:8000

Plain `python -m http.server` sends Last-Modified, so browsers hang onto the JS
and CSS and you end up staring at an old page wondering why your edit did nothing.
This sends no-store on everything instead.
"""
import http.server, os, socketserver, sys

PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 8000
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


class NoCache(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *a, **kw):
        super().__init__(*a, directory=ROOT, **kw)

    def end_headers(self):
        self.send_header("Cache-Control", "no-store, must-revalidate")
        self.send_header("Pragma", "no-cache")
        self.send_header("Expires", "0")
        super().end_headers()

    def log_message(self, fmt, *args):
        code = args[1] if len(args) > 1 else ""
        if str(code) != "200":
            super().log_message(fmt, *args)


class Reusable(socketserver.TCPServer):
    allow_reuse_address = True


if __name__ == "__main__":
    with Reusable(("127.0.0.1", PORT), NoCache) as srv:
        print("serving %s\n  http://localhost:%d\n(ctrl-c to stop)" % (ROOT, PORT))
        try:
            srv.serve_forever()
        except KeyboardInterrupt:
            print("\nstopped")
