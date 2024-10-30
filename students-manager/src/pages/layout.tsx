import { Header } from '@/components/header';
import { Toaster } from '@/components/ui/sonner';

export default function Layout({ children }: { children: React.ReactNode }): React.ReactElement {
  return (
    <div className="h-screen w-screen flex flex-col">
      <Header />
      <Toaster />
      {children}
    </div>
  );
}