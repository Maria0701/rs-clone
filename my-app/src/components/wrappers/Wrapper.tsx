import { ReactNode } from 'react';
import { Footer } from '../footer/Footer'
import { Header } from '../header/header'

interface IWrapper {
    children: ReactNode
}

export function Wrapper({children}: IWrapper) {
  return (
    <>
        <Header />
            <main className="">
                <div className="container">
                    {children}
                </div>
            </main>
        <Footer />
    </>
  )
}
