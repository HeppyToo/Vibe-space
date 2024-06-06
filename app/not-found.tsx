import Link from "next/link";

export default function NotFound() {
  return (
    <div className="text-white h-screen flex flex-col gap-4 justify-center items-center bg-black">
      <h1 className="font-semibold text-5xl mb-5">
        Sorry, this page isn't available.
      </h1>
      <div className='flex items-center gap-3'>
        The link you followed may be broken, or the page may have been removed.

        <Link className='text-muted-foreground underline' href="/"> Go back to Vibe Space.</Link>
      </div>
    </div>
  );
}
