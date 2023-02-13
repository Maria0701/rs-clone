import { RegisterForm } from "../components/forms/RegisterForm";
import { Header } from "../components/header/header";

export function Register() {
  return (
    <>
        <Header />
        <main className="justify-center">
            <div className="container">
                <section className="registrarion">
                <h1 className="h1 registration__h1">Register</h1>
                <p className='registration__text'>Please crete account</p>
                    <RegisterForm />
                </section>
            </div>
        </main>
    </>
  )
}
