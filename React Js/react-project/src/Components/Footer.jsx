import React from 'react'

export default function Footer() {
    return (
        <>
            <footer class="bg-black text-white">
                <div class="mx-auto max-w-7xl px-6 py-12">
                    <div class="grid grid-cols-1 gap-8 md:grid-cols-4">
                        <div>
                            <h2 class="text-xl font-bold">YourBrand</h2>
                            <p class="mt-3 text-sm text-gray-400">
                                Building simple and beautiful experiences.
                            </p>
                        </div>

                        <div>
                            <h3 class="font-semibold">Company</h3>
                            <ul class="mt-4 space-y-2 text-sm text-gray-400">
                                <li><a href="#" class="hover:text-white">About</a></li>
                                <li><a href="#" class="hover:text-white">Careers</a></li>
                                <li><a href="#" class="hover:text-white">Contact</a></li>
                            </ul>
                        </div>

                        <div>
                            <h3 class="font-semibold">Resources</h3>
                            <ul class="mt-4 space-y-2 text-sm text-gray-400">
                                <li><a href="#" class="hover:text-white">Blog</a></li>
                                <li><a href="#" class="hover:text-white">Help Center</a></li>
                                <li><a href="#" class="hover:text-white">Documentation</a></li>
                            </ul>
                        </div>

                        <div>
                            <h3 class="font-semibold">Follow us</h3>
                            <div class="mt-4 flex gap-4 text-sm text-gray-400">
                                <a href="#" class="hover:text-white">Twitter</a>
                                <a href="#" class="hover:text-white">GitHub</a>
                                <a href="#" class="hover:text-white">LinkedIn</a>
                            </div>
                        </div>
                    </div>

                    <div class="mt-10 border-t border-gray-800 pt-6 text-center text-sm text-gray-500">
                        © 2026 YourBrand. All rights reserved.
                    </div>
                </div>
            </footer>
        </>
    )
}
