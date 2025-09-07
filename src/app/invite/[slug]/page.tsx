import { supabaseServer } from "@/lib/supabaseServer";
import { notFound } from "next/navigation";
import Countdown from "@/components/Countdown";
import RSVPForm from "@/components/RSVPForm";
import GuestbookForm from "@/components/GuestbookForm";

export default async function InvitationPublicPage({
  params,
}: {
  params: { slug: string };
}) {
  const supabase = await supabaseServer();

  const { data: invitation } = await supabase
    .from("invitations")
    .select("*")
    .eq("slug", params.slug)
    .single();

  if (!invitation) return notFound();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
      {invitation.cover_image_url && (
        <img
          src={invitation.cover_image_url}
          alt="Cover"
          className="w-full max-w-2xl rounded-lg shadow mb-6"
        />
      )}
      <h1 className="text-3xl font-bold text-center mb-2">
        {invitation.bride_name} & {invitation.groom_name}
      </h1>
      <p className="text-gray-600 text-center mb-4">{invitation.title}</p>

      <div className="text-center mb-6">
        <p className="font-semibold">Tanggal Acara:</p>
        <p>{new Date(invitation.event_date).toLocaleDateString("id-ID")}</p>
      </div>

      <RSVPForm invitationId={invitation.id} />
      <GuestbookForm invitationId={invitation.id} />

      {/* Countdown timer */}
      <Countdown targetDate={invitation.event_date} />

      {/* Google Maps embed */}
      {invitation.location_url && (
        <iframe
          src={invitation.location_url}
          className="w-full max-w-2xl h-72 rounded-lg mt-6"
          loading="lazy"
        ></iframe>
      )}
    </div>
  );
}
