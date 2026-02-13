import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'SaaS Compare Pro - Find the Best SaaS Tools';
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
                    backgroundColor: '#0f172a',
                    backgroundImage: 'radial-gradient(circle at 50% 50%, #1e1b4b 0%, #0f172a 100%)',
                }}
            >
                {/* Decorative Elements */}
                <div style={{ position: 'absolute', top: 40, left: 40, width: 200, height: 200, backgroundColor: 'rgba(79, 70, 229, 0.1)', borderRadius: '100%', filter: 'blur(60px)' }}></div>
                <div style={{ position: 'absolute', bottom: 40, right: 40, width: 300, height: 300, backgroundColor: 'rgba(250, 204, 21, 0.05)', borderRadius: '100%', filter: 'blur(80px)' }}></div>

                {/* Main Content */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginBottom: 40 }}>
                    <div style={{
                        width: 120,
                        height: 120,
                        backgroundColor: '#4f46e5',
                        borderRadius: 30,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 20px 50px rgba(79, 70, 229, 0.3)',
                        border: '1px solid rgba(255, 255, 255, 0.1)'
                    }}>
                        <svg width="80" height="80" viewBox="0 0 24 24" fill="none">
                            <path d="M7 3C9.5 3 13 4.5 15 7C17 9.5 18 13.5 17 17C16 20.5 12 21 10 21C8 21 4 20.5 3 17C2 13.5 3 9.5 5 7C7 4.5 7 3 7 3Z" fill="#FACC15" />
                        </svg>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <h1 style={{ fontSize: 80, fontWeight: 900, color: 'white', margin: 0, letterSpacing: '-0.05em' }}>
                            SaaS<span style={{ color: '#4f46e5', fontStyle: 'italic' }}>Compare</span>
                        </h1>
                        <p style={{ fontSize: 24, color: 'rgba(255, 255, 255, 0.5)', margin: 0, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.4em' }}>
                            Pro Insights & Analysis
                        </p>
                    </div>
                </div>

                <div style={{
                    padding: '20px 60px',
                    backgroundColor: 'rgba(255, 255, 255, 0.03)',
                    borderRadius: 100,
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    color: '#e2e8f0',
                    fontSize: 32,
                    fontWeight: 700
                }}>
                    The #1 Software Comparison Platform
                </div>
            </div>
        ),
        {
            ...size,
        }
    );
}
