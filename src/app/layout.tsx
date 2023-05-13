import { UserProvider } from '@/contexts/user_provider';
import './globals.css';
import { NotebookProvider } from '@/contexts/notebook_provider';
import { Withdraw } from '@/@clean/shared/domain/entities/withdraw';
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
            <WithdrawProvider>
              <div id="root">{children}</div>
            </WithdrawProvider>
          </NotebookProvider>
        </UserProvider>
      </body>
    </html>
  );
}
