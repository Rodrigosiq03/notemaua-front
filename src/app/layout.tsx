import { UserProvider } from '@/contexts/user_provider';
import './globals.css';
import { NotebookProvider } from '@/contexts/notebook_provider';
import { WithdrawProvider } from '@/contexts/withdraw_provider';

export const metadata = {
  title: 'NoteMauá',
  description:
    'NoteMauá é uma plataforma de retirada de notebook para os alunos do IMT',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <UserProvider>
          <NotebookProvider>
            <WithdrawProvider>{children}</WithdrawProvider>
          </NotebookProvider>
        </UserProvider>
      </body>
    </html>
  );
}
