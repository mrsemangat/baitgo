import Script from 'next/script'

export function GTMScript({ gtmId }: { gtmId?: string }) {
  const id = gtmId || process.env.NEXT_PUBLIC_GTM_ID
  if (!id) return null
  return (
    <Script id="gtm-script" strategy="afterInteractive">
      {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','${id}');`}
    </Script>
  )
}

export function GTMNoScript({ gtmId }: { gtmId?: string }) {
  const id = gtmId || process.env.NEXT_PUBLIC_GTM_ID
  if (!id) return null
  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${id}`}
        height="0" width="0"
        style={{ display: 'none', visibility: 'hidden' }}
        title="GTM"
      />
    </noscript>
  )
}

// Push custom event ke dataLayer
export function pushGTM(event: string, data?: Record<string, unknown>) {
  if (typeof window !== 'undefined') {
    ;(window as Window & { dataLayer?: unknown[] }).dataLayer =
      (window as Window & { dataLayer?: unknown[] }).dataLayer || []
    ;(window as Window & { dataLayer?: unknown[] }).dataLayer!.push({ event, ...data })
  }
}
