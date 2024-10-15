import { UiLegacy } from '@repo/ui-legacy';

export default function Index() {
  return (
    <div className="flex flex-col items-center justify-center gap-10 bg-gray-50 min-h-screen">
      <h1 className="bg-orange-100 p-10 text-gray-600 rounded-lg">
        Hello from the ADMIN NextJS Application 👋
      </h1>

      <UiLegacy />
    </div>
  );
}
