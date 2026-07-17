import { useState, useRef } from 'react';
import { Upload, X, File, Image } from 'lucide-react';
import uploadService from '../../services/uploadService';

export default function FileUpload({ onUpload, accept = 'image/*', module = 'general', maxSize = 2, label = 'Upload File' }) {
  const inputRef = useRef(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const handleFile = async (file) => {
    if (!file) return;
    setError('');

    if (file.size > maxSize * 1024 * 1024) {
      setError(`File terlalu besar. Maksimal ${maxSize}MB`);
      return;
    }

    if (accept !== '*' && accept.includes('image') && !file.type.startsWith('image/')) {
      setError('Hanya file gambar yang diperbolehkan');
      return;
    }

    setUploading(true);
    try {
      const result = await uploadService.uploadImage(file, module);
      setPreview(URL.createObjectURL(file));
      onUpload(result);
    } catch (err) {
      setError(err.response?.data?.message || 'Gagal upload file');
    }
    setUploading(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    handleFile(e.dataTransfer.files[0]);
  };

  const handleChange = (e) => {
    handleFile(e.target.files[0]);
    if (inputRef.current) inputRef.current.value = '';
  };

  const handleRemove = () => {
    setPreview(null);
    onUpload(null);
  };

  return (
    <div className="file-upload-wrapper">
      {!preview ? (
        <div className="file-upload-dropzone" onDrop={handleDrop} onDragOver={(e) => e.preventDefault()}
          onClick={() => inputRef.current?.click()}
          style={{ border: '2px dashed #D1D5DB', borderRadius: 12, padding: '2rem', textAlign: 'center', cursor: 'pointer', transition: 'border-color 0.2s', background: '#F9FAFB' }}
          onMouseEnter={(e) => e.currentTarget.style.borderColor = '#1A56DB'}
          onMouseLeave={(e) => e.currentTarget.style.borderColor = '#D1D5DB'}>
          <input ref={inputRef} type="file" accept={accept} onChange={handleChange} style={{ display: 'none' }} />
          {uploading ? (
            <div style={{ color: '#6B7280' }}>Mengupload...</div>
          ) : (
            <>
              <div style={{ color: '#1A56DB', marginBottom: '0.5rem' }}><Upload size={32} /></div>
              <p style={{ fontWeight: 500, color: '#374151' }}>{label}</p>
              <p style={{ fontSize: '0.75rem', color: '#9CA3AF', marginTop: '0.25rem' }}>Drag & drop atau klik untuk memilih file</p>
              <p style={{ fontSize: '0.6875rem', color: '#9CA3AF', marginTop: '0.25rem' }}>Max {maxSize}MB</p>
            </>
          )}
        </div>
      ) : (
        <div className="file-upload-preview" style={{ position: 'relative', display: 'inline-block' }}>
          {accept.includes('image') ? (
            <img src={preview} alt="preview" style={{ maxWidth: '100%', maxHeight: 200, borderRadius: 8, objectFit: 'cover' }} />
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem', background: '#F3F4F6', borderRadius: 8 }}>
              <File size={20} />
              <span style={{ fontSize: '0.875rem' }}>File siap</span>
            </div>
          )}
          <button onClick={handleRemove} style={{ position: 'absolute', top: 4, right: 4, background: '#EF4444', color: '#fff', border: 'none', borderRadius: '50%', width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <X size={14} />
          </button>
        </div>
      )}
      {error && <p style={{ fontSize: '0.75rem', color: '#EF4444', marginTop: '0.25rem' }}>{error}</p>}
    </div>
  );
}
