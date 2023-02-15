import { LoginForm } from "../components/forms/LoginForm";
import { Header } from "../components/header/header";

export function LoginPage() {
    return (
        <>
        <Header />
        <main className="justify-center">
            <div className="container">
                <section className="registrarion">
                <h1 className="h1 registration__h1">Login</h1>
                <p className='registration__text'>Please login to see contents</p>
                    <LoginForm />
                </section>
            </div>
        </main>
        </>
    );
};