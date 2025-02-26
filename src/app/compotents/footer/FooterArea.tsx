import Link from "next/link";

const FooterArea = () => {
  return (
    <div className="bg-white">
      <h2 className="sr-only">footer</h2>
      <div className="mx-auto max-w-7xl px-6 pb-8 mt-8 sm:mt-12 lg:px-8 lg:mt-16 border-t border-gray-900/10 pt-16">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8">
            <img
              className="h-7"
              src="https://pdf.ai/favicon.ico"
              alt="PDF.ai logo"
            ></img>
            <div className="text-sm leading-6 text-gray-600">
              Chat with any PDF: ask questions, get summaries, find information,
              and more.
            </div>
            <div className="flex space-x-6">
              <Link
                href="https://www.tiktok.com/@pdfai"
                className="text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">TikTok</span>
                <img className="w-[20px]" src="tictok.svg" alt="" />
              </Link>
              <Link
                href="https://www.instagram.com/pdfdotai/"
                className="text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Instagram</span>
                <img className="w-[20px]" src="insgram.svg" alt="" />
              </Link>
              <Link
                href="https://twitter.com/pdfdotai"
                className="text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Twitter</span>
                <img className="w-[20px]" src="twitter.svg" alt="" />
              </Link>
              <Link
                href="https://www.youtube.com/@pdfai"
                className="text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">YouTube</span>
                <img className="w-[20px]" src="youtube.svg" alt="" />
              </Link>
            </div>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-3 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-gray-900">
                  Products
                </h3>
                <ul className="mt-6 space-y-4 list-none p-0" role="list">
                  <li className="p-0 m-0">
                    <Link
                      href="/use-cases"
                      className="text-sm leading-6 text-gray-600 hover:text-gray-900"
                    >
                      Use cases
                    </Link>
                  </li>
                  <li className="p-0 m-0">
                    <Link
                      href="/use-cases"
                      className="text-sm leading-6 text-gray-600 hover:text-gray-900"
                    >
                      Chrome extension
                    </Link>
                  </li>
                  <li className="p-0 m-0">
                    <Link
                      href="/use-cases"
                      className="text-sm leading-6 text-gray-600 hover:text-gray-900"
                    >
                      API docs
                    </Link>
                  </li>
                  <li className="p-0 m-0">
                    <Link
                      href="/use-cases"
                      className="text-sm leading-6 text-gray-600 hover:text-gray-900"
                    >
                      Pricing
                    </Link>
                  </li>
                  <li className="p-0 m-0">
                    <Link
                      href="/use-cases"
                      className="text-sm leading-6 text-gray-600 hover:text-gray-900"
                    >
                      Video tutorials
                    </Link>
                  </li>
                  <li className="p-0 m-0">
                    <Link
                      href="/use-cases"
                      className="text-sm leading-6 text-gray-600 hover:text-gray-900"
                    >
                      Resources
                    </Link>
                  </li>
                  <li className="p-0 m-0">
                    <Link
                      href="/use-cases"
                      className="text-sm leading-6 text-gray-600 hover:text-gray-900"
                    >
                      Blog
                    </Link>
                  </li>
                  <li className="p-0 m-0">
                    <Link
                      href="/use-cases"
                      className="text-sm leading-6 text-gray-600 hover:text-gray-900"
                    >
                      FAQ
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-gray-900">
                  We also built
                </h3>
                <ul className="mt-6 space-y-4 list-none p-0">
                  <li className="p-0 m-0">
                    <Link
                      href="/use-cases"
                      className="text-sm leading-6 text-gray-600 hover:text-gray-900"
                    >
                      Resume AI Scanner
                    </Link>
                  </li>
                  <li className="p-0 m-0">
                    <Link
                      href="/use-cases"
                      className="text-sm leading-6 text-gray-600 hover:text-gray-900"
                    >
                      Invoice AI Scanner
                    </Link>
                  </li>
                  <li className="p-0 m-0">
                    <Link
                      href="/use-cases"
                      className="text-sm leading-6 text-gray-600 hover:text-gray-900"
                    >
                      AI Quiz Generator
                    </Link>
                  </li>
                  <li className="p-0 m-0">
                    <Link
                      href="/use-cases"
                      className="text-sm leading-6 text-gray-600 hover:text-gray-900"
                    >
                      QuickyAI
                    </Link>
                  </li>
                  <li className="p-0 m-0">
                    <Link
                      href="/use-cases"
                      className="text-sm leading-6 text-gray-600 hover:text-gray-900"
                    >
                      Docsium
                    </Link>
                  </li>
                  <li className="p-0 m-0">
                    <Link
                      href="/use-cases"
                      className="text-sm leading-6 text-gray-600 hover:text-gray-900"
                    >
                      PDF GPTs
                    </Link>
                  </li>
                  <li className="p-0 m-0">
                    <Link
                      href="/use-cases"
                      className="text-sm leading-6 text-gray-600 hover:text-gray-900"
                    >
                      PDF AI generator
                    </Link>
                  </li>
                  <li className="p-0 m-0">
                    <Link
                      href="/use-cases"
                      className="text-sm leading-6 text-gray-600 hover:text-gray-900"
                    >
                      Other PDF tools
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-gray-900">
                  Company
                </h3>
                <ul className="mt-6 space-y-4 list-none p-0">
                  <li className="p-0 m-0">
                    <Link
                      href="/use-cases"
                      className="text-sm leading-6 text-gray-600 hover:text-gray-900"
                    >
                      PDF.ai vs ChatPDF
                    </Link>
                  </li>
                  <li className="p-0 m-0">
                    <Link
                      href="/use-cases"
                      className="text-sm leading-6 text-gray-600 hover:text-gray-900"
                    >
                      PDF.ai vs Acrobat Reader
                    </Link>
                  </li>
                  <li className="p-0 m-0">
                    <Link
                      href="/use-cases"
                      className="text-sm leading-6 text-gray-600 hover:text-gray-900"
                    >
                      Legal
                    </Link>
                  </li>
                  <li className="p-0 m-0">
                    <Link
                      href="/use-cases"
                      className="text-sm leading-6 text-gray-600 hover:text-gray-900"
                    >
                      Affiliate program 💵
                    </Link>
                  </li>
                  <li className="p-0 m-0">
                    <Link
                      href="/use-cases"
                      className="text-sm leading-6 text-gray-600 hover:text-gray-900"
                    >
                      Investor
                    </Link>
                  </li>
                  {/* <li className="p-0 m-0">
                    <Link
                      href="/use-cases"
                      className="text-sm leading-6 text-gray-600 hover:text-gray-900"
                    >
                      PDF GPTs
                    </Link>
                  </li>
                  <li className="p-0 m-0">
                    <Link
                      href="/use-cases"
                      className="text-sm leading-6 text-gray-600 hover:text-gray-900"
                    >
                      PDF AI generator
                    </Link>
                  </li>
                  <li className="p-0 m-0">
                    <Link
                      href="/use-cases"
                      className="text-sm leading-6 text-gray-600 hover:text-gray-900"
                    >
                      Other PDF tools
                    </Link>
                  </li> */}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterArea;
