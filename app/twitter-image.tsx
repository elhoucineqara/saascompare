import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'SaaS Compare Pro - Twitter Preview';
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
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#4f46e5',
                    backgroundImage: 'linear-gradient(135deg, #4f46e5 0%, #312e81 100%)',
                }}
            >
                <div style={{
                    width: 160,
                    height: 160,
                    backgroundColor: 'white',
                    borderRadius: 40,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 32,
                    boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
                }}>
                    <svg width="100" height="100" viewBox="0 0 24 24" fill="none">
                        <path d="M7 3C9.5 3 13 4.5 15 7C17 9.5 18 13.5 17 17C16 20.5 12 21 10 21C8 21 4 20.5 3 17C2 13.5 3 9.5 5 7C7 4.5 7 3 7 3Z" fill="#FACC15" />
                    </svg>
                </div>
                <h1 style={{ fontSize: 72, fontWeight: 900, color: 'white', margin: 0, letterSpacing: '-0.02em' }}>
                    SaaS Compare Pro
                </h1>
                <p style={{ fontSize: 28, color: 'rgba(255, 255, 255, 0.8)', marginTop: 16, fontWeight: 600 }}>
                    Stop guessing. Start comparing.
                </p>
            </div>
        ),
        {
            ...size,
        }
    );
}
