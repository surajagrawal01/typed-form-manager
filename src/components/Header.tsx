export const Header = () => {
    return (
        <header className="bg-white shadow-sm sticky top-0 z-10">
            <div className=" mx-auto py-4 px-4 flex items-center justify-between">
                <h1 className="text-xl font-semibold tracking-tight text-gray-900">
                    Custom React Form Hook
                </h1>

                <nav className="flex items-center gap-4">
                    <a
                        href="https://github.com/surajagrawal01/typed-form-manager"
                        className="text-sm text-gray-600 hover:text-gray-900 transition flex items-center space-between"
                    >
                        <div className="px-2">
                            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" width="30" />
                        </div>
                        GitHub
                    </a>
                </nav>
            </div>
        </header>
    )
}