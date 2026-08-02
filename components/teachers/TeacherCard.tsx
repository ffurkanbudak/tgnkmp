import { Photo } from "@/components/ui/Photo";
import type { Teacher } from "@/lib/content";

/**
 * Reusable teacher card.
 *
 * The portrait zone is always present, so adding photographs later changes
 * nothing structurally: without `photo` it renders an initials monogram, with
 * `photo` the same box holds the portrait. `bio` behaves the same way — supply
 * it and the detail line appears in the space already allotted to it.
 */
export function TeacherCard({ teacher }: { teacher: Teacher }) {
  const initials = getInitials(teacher.name);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-line bg-paper transition-[transform,box-shadow,border-color] duration-[650ms] ease-[var(--ease-out-expo)] hover:-translate-y-1.5 hover:border-transparent hover:shadow-[0_2px_4px_rgba(13,21,38,0.04),0_28px_56px_-30px_rgba(13,21,38,0.3)]">
      <div className="relative aspect-square w-full overflow-hidden bg-bone">
        {teacher.photo ? (
          <Photo
            src={teacher.photo}
            alt={`${teacher.name} | ${teacher.branch} öğretmeni`}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="absolute inset-0"
            imgClassName="transition-transform duration-[900ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
          />
        ) : (
          <div className="absolute inset-0 grid place-items-center" aria-hidden="true">
            <span className="text-[2.75rem] font-medium tracking-[-0.05em] text-navy-200 transition-colors duration-[650ms] group-hover:text-navy-300 lg:text-[3.25rem]">
              {initials}
            </span>
          </div>
        )}
        <span
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-brand-600 transition-transform duration-[650ms] ease-[var(--ease-out-expo)] group-hover:scale-x-100"
        />
      </div>

      <div className="flex flex-1 flex-col p-6 lg:p-7">
        <h3 className="text-[1.0625rem] font-semibold leading-snug tracking-[-0.02em] text-navy-950 lg:text-[1.125rem]">
          {teacher.name}
        </h3>
        <p className="mt-2 text-[0.8125rem] tracking-[-0.005em] text-faint">
          {teacher.branch}
        </p>
        {teacher.bio && (
          <p className="mt-4 text-[0.875rem] leading-relaxed text-muted">
            {teacher.bio}
          </p>
        )}
      </div>
    </article>
  );
}

function getInitials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toLocaleUpperCase("tr-TR"))
    .join("");
}
