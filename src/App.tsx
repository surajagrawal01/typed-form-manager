import { Footer } from './components/Footer'
import { Form } from './components/Form'
import { FormRegister } from './components/FormRegister'
import { Header } from './components/Header'

function App() {

  return (
    <>
      <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
        <Header />
        <main className="flex-1 flex justify-center items-start mt-12 px-4">
          <div className="w-full max-w-xl bg-white shadow-md rounded-lg p-8 border border-gray-200 mx-12">

            <h2 className="text-2xl font-semibold mb-6">
              Example Form
            </h2>

            <p className="text-sm text-gray-600 mb-6">
              This form demonstrates the usage of the <strong>useForm</strong> hook built with TypeScript and React.
            </p>

            <Form />

          </div>
          <div className="w-full max-w-xl bg-white shadow-md rounded-lg p-8 border border-gray-200">

            <h2 className="text-2xl font-semibold mb-6">
              Example Form Register
            </h2>

            <p className="text-sm text-gray-600 mb-6">
              This form demonstrates the usage of the <strong>useForm</strong>
              hook built with TypeScript and React with register API (less boiler plate code).
            </p>

            <FormRegister />

          </div>
        </main>

        <Footer />
      </div>
    </>
  )
}

export default App
