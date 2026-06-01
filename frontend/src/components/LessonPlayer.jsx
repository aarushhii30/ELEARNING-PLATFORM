export default function LessonPlayer({ lesson }) {
  if (!lesson) return null;
  return (
    <div>
      {lesson.videoUrl ? (
        <div className="aspect-video w-full overflow-hidden rounded-lg bg-black">
          <iframe
            title={lesson.title}
            src={lesson.videoUrl}
            className="h-full w-full"
            allowFullScreen
          />
        </div>
      ) : null}
      <h3 className="mt-4 text-lg font-semibold">{lesson.title}</h3>
      <div
        className="prose mt-2 max-w-none text-gray-700"
        dangerouslySetInnerHTML={{ __html: lesson.contentHtml || "<p>No content yet.</p>" }}
      />
    </div>
  );
}
