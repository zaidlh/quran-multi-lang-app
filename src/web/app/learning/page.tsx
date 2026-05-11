import { MainNavigation, DesktopNavigation } from "../components/Navigation";

const courses = [
  { id: "tajweed", name: "Tajweed Rules", description: "Learn proper pronunciation", icon: "🔊", lessons: 12 },
  { id: "arabic", name: "Arabic Basics", description: "Foundations of Arabic", icon: "📝", lessons: 20 },
  { id: "stories", name: "Prophet Stories", description: "Lessons from the prophets", icon: "📖", lessons: 25 },
  { id: "fiqh", name: "Islamic Fiqh", description: "Understanding rulings", icon: "⚖️", lessons: 15 },
  { id: "aqeedah", name: "Aqeedah", description: "Beliefs and theology", icon: "💭", lessons: 10 },
  { id: "seerah", name: "Seerah", description: "Life of the Prophet", icon: "🕌", lessons: 30 },
];

export default function LearningPage() {
  return (
    <div className="min-h-screen bg-surface-container-lowest">
      <DesktopNavigation />
      
      <main className="max-w-2xl mx-auto px-4 pb-24 pt-6">
        <h1 className="text-2xl font-bold mb-2">مركز التعلم</h1>
        <p className="text-outline mb-6">Islamic education and courses</p>

        <div className="space-y-3">
          {courses.map((course) => (
            <a
              key={course.id}
              href={`/learning/${course.id}`}
              className="block p-4 bg-surface-container rounded-xl hover:bg-surface-container-high transition-colors"
            >
              <div className="flex items-center gap-4">
                <span className="text-2xl">{course.icon}</span>
                <div className="flex-1">
                  <p className="font-medium">{course.name}</p>
                  <p className="text-sm text-outline">{course.description}</p>
                </div>
                <span className="text-sm text-outline">{course.lessons} lessons</span>
              </div>
            </a>
          ))}
        </div>
      </main>

      <MainNavigation />
    </div>
  );
}