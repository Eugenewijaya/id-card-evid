interface CompanyLogoProps {
  url: string;
  companyName: string;
}

export default function CompanyLogo({ url, companyName }: CompanyLogoProps) {
  if (!url) return null;

  return (
    <div className="relative h-6 mt-4 flex items-center justify-start">
      <img src={url} alt={companyName} className="max-h-[24px] w-auto object-contain" />
    </div>
  );
}
