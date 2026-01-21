import React from 'react'

const Footer = () => {
    return (
        <footer className="w-full bg-light-primary pt-20 pb-10 flex justify-center border-t border-light-secondary/10">
            {/* Matching Hero Width: 80vw */}
            <div className="w-full px-8 lg:w-[80vw] mx-auto flex flex-col">

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand Column */}
                    <div className="flex flex-col gap-6">
                        <div className="flex items-center gap-2">
                            <span className="text-3xl font-extrabold tracking-tight">
                                <span className="text-light-secondary">Sig</span>
                                <span className="text-light-secondary">lyk</span>
                            </span>
                        </div>
                        <p className="text-sm text-dark-secondary leading-relaxed">
                            Empowering accessibility through innovative AI. We're on a mission to bridge the communication gap for the deaf and hard of hearing community globally.
                        </p>
                    </div>

                    {/* Links Columns */}
                    {[
                        { title: "Company", links: ["About Us", "Careers", "Press", "Accessibility"] },
                        { title: "Product", links: ["Features", "Mobile App", "Desktop", "API"] },
                        { title: "Support", links: ["Help Center", "Privacy", "Terms", "Contact"] }
                    ].map((col, i) => (
                        <div key={i} className="flex flex-col gap-6">
                            <h4 className="font-bold text-text-dark">{col.title}</h4>
                            <ul className="flex flex-col gap-4 text-sm text-dark-secondary/70">
                                {col.links.map(link => (
                                    <li key={link}>
                                        <a className="hover:text-light-secondary transition-colors" href="#">{link}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom Bar */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-10 border-t border-light-secondary/10">
                    <div className="text-xs text-light-secondary/60">
                        © 2026 Siglyk Accessibility Tech. All rights reserved. Built with love for universal communication.
                    </div>
                    <div className="flex gap-8">
                        <a className="text-xs text-light-secondary/60 hover:text-light-secondary transition-colors" href="#">Cookies</a>
                        <a className="text-xs text-light-secondary/60 hover:text-light-secondary transition-colors" href="#">Legal</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer