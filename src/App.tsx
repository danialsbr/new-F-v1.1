import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from '@/components/ui/navbar';
import { Dashboard } from '@/pages/dashboard';
import { Upload } from '@/pages/upload';
import { Orders } from '@/pages/orders';
import { Transfer } from '@/pages/transfer';
import { Download } from '@/pages/download';
import { Scan } from '@/pages/scan';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/transfer" element={<Transfer />} />
            <Route path="/download" element={<Download />} />
            <Route path="/scan/:orderId" element={<Scan />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;