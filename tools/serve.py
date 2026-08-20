"""Dev server that refuses to let the browser cache anything.

python tools/serve.py    ->  http://localhost:8000

Plain `python -m http.server` sends Last-Modified, so browsers hang onto the JS
and CSS and you end up staring at an old page wondering why your edit did nothing.
This sends no-store on everything instead.
"""
import errno, http.server, os, socketserver, sys

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


if __name__ == "__main__":
    # TCPServer defaults allow_reuse_address to False. Do not set it True: on Windows that
    # lets a second serve.py bind 8000 on top of the first, and they race to serve stale files.
    try:
        srv = socketserver.TCPServer(("127.0.0.1", PORT), NoCache)
    except OSError as e:
        if e.errno != errno.EADDRINUSE:
            raise
        raise SystemExit(
            "port %d is already serving. stop that one first, or pick another port:\n"
            "  python tools/serve.py %d" % (PORT, PORT + 1)
        )
    with srv:
        print("serving %s\n  http://localhost:%d\n(ctrl-c to stop)" % (ROOT, PORT))
        try:
            srv.serve_forever()
        except KeyboardInterrupt:
            print("\nstopped")
