import { UserProvider } from '@/contexts/user_provider'
import './globals.css'

export const metadata = {
  title: 'NoteMauá',
  description: 'NoteMauá é uma plataforma de retirada de notebook para os alunos do IMT',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <UserProvider>
          { children }
        </UserProvider>  
      </body>
    </html>
  )
}
