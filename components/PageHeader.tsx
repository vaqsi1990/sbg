type PageHeaderProps = {
  title: string;
  subtitle?: string;
};

export default function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <div className="bg-brand-chrome text-white pt-40 lg:pt-48 pb-10 lg:pb-14">
      <div className="container mx-auto px-4 lg:px-6 text-center">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">{title}</h1>
        {subtitle ? (
          <p className="mt-4 max-w-2xl mx-auto text-base lg:text-lg text-white/85 leading-relaxed">
            {subtitle}
          </p>
        ) : null}
      </div>
    </div>
  );
}
