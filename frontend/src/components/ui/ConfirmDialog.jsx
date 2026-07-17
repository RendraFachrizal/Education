import Modal from '../common/Modal';
import Button from '../common/Button';

export default function ConfirmDialog({ isOpen, onClose, onConfirm, title = 'Konfirmasi Hapus', message = 'Apakah Anda yakin ingin menghapus data ini?', loading = false }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} width="400px">
      <p style={{ color: '#6B7280', marginBottom: '1.5rem', fontSize: '0.875rem' }}>{message}</p>
      <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
        <Button variant="outline" size="sm" onClick={onClose} disabled={loading}>Batal</Button>
        <Button variant="danger" size="sm" onClick={onConfirm} loading={loading}>Hapus</Button>
      </div>
    </Modal>
  );
}
