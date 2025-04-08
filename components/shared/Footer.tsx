import Image from "next/image"
import Link from "next/link"

const Footer = () => {
  return (
    <footer className="border-t">
      <div className="flex-center wrapper flex-between flex flex-col gap-4 p-5 text-center sm:flex-row">
        <Link href='/'>
          <Image 
            src="/assets/images/me_logo.png"
            alt="logo"
            width={60}
            height={25}
          />
        </Link>

        <p>2025 myEvents. All Rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer