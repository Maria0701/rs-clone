import { Footer } from "../components/footer/Footer";
import { Header } from "../components/header/header";

export function ProgramsIndex() {
    return (
        <>
            <Header />
            <main>
                <div className="container">
                <p>Эта страница должна быть стартовой для зарегистрированного человека</p>
                </div>
            </main>            
            <Footer />
        </>
    );
};