import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-6 md:py-8">
        <div className="mb-6 flex flex-col gap-6 md:flex-row md:justify-center">
          {/* <Link
            href="/terms"
            className="text-muted-foreground text-center hover:text-foreground md:text-left"
          >
            利用規約
          </Link> */}
          <Link
            href="https://docs.google.com/forms/d/1x1rq3uiTPskF3qWEo63LgpO2ahAv9ah2hkzvYB_J8IA"
            className="text-muted-foreground text-center hover:text-foreground md:text-left"
          >
            お問い合わせ
          </Link>
        </div>
        <div className="border-t pt-6">
          <p className="text-muted-foreground text-center text-sm">
            © {new Date().getFullYear()} Carrer App. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
