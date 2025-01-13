export default async function Page() {
  // const session = await getServerSession(authOptions);
  return (
    <div className="rounded-lg bg-white p-6 shadow">
      <h2 className="mb-4 text-2xl font-semibold text-gray-800">
        ダッシュボード
      </h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* ダッシュボードカード */}
        <div className="rounded-lg bg-emerald-50 p-6">
          <h3 className="mb-2 font-medium text-emerald-600">総ユーザー数</h3>
          <p className="text-3xl font-bold text-gray-800">1,234</p>
        </div>
        <div className="rounded-lg bg-emerald-50 p-6">
          <h3 className="mb-2 font-medium text-emerald-600">今月の新規登録</h3>
          <p className="text-3xl font-bold text-gray-800">56</p>
        </div>
        <div className="rounded-lg bg-emerald-50 p-6">
          <h3 className="mb-2 font-medium text-emerald-600">
            アクティブユーザー
          </h3>
          <p className="text-3xl font-bold text-gray-800">789</p>
        </div>
      </div>
    </div>
  );
}
