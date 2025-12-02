export default function Header({ title }: { title: string }) {
  return (
    <header className="bg-white border-b border-[#E2E8F0] w-full h-20 flex justify-between items-center px-10">
      <h1 className="text-2xl font-semibold text-primary">{title}</h1>
      <div className="flex gap-8">
        <img src="/noti.svg" alt="알림" />
        <p className="font-medium">관리자님</p>
        <p className="cursor-pointer hover:underline">로그아웃</p>
      </div>
    </header>
  );
}
