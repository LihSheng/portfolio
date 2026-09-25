import { ImageResponse } from 'next/og';

export const alt = 'Ng Lih Sheng - Full-stack software developer, Singapore';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: 24,
          padding: '0 96px',
          background: '#F4F2ED',
          color: '#1D1B17',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <div style={{ display: 'flex', fontSize: 76, fontWeight: 500 }}>Ng Lih Sheng</div>
        <div style={{ display: 'flex', fontSize: 34, color: '#504C43' }}>
          Full-stack software developer, Singapore
        </div>
        <div style={{ display: 'flex', fontSize: 24, color: '#6E6A60' }}>lihsheng.space</div>
      </div>
    ),
    {
      ...size,
    }
  );
}
