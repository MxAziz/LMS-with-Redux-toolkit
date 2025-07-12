import { Snail } from "lucide-react"
import { Link } from "react-router-dom"

const Footer = () => {
  return (
    <footer className="bg-[#226957] text-white py-8 px-4 mt-16">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Brand Info */}
        <div>
          <h2 className="text-xl font-bold mb-2">
            <Snail className="inline-block mr-2 h-6 w-6" />
          BookNest
          </h2>
          <p className="text-sm">
            Smart way to manage your books, borrowing and users in one place.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-1 text-sm">
            <li><Link to="#" className="hover:underline">Home</Link></li>
            <li><Link to="#" className="hover:underline">Browse Books</Link></li>
            <li><Link to="#" className="hover:underline">My Borrowed</Link></li>
            <li><Link to="#" className="hover:underline">Contact</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Contact Info</h3>
          <ul className="text-sm space-y-1">
            <li>Email: support@BookNest.com</li>
            <li>Phone: +880 1234-567890</li>
            <li>Address: PUST Campus, Pabna, Bangladesh</li>
          </ul>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-8 text-center text-xs text-white/80">
        &copy; {new Date().getFullYear()} BookNest. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer
