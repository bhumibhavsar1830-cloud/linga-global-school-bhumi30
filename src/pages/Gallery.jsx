import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'

// Original school gallery photos — kept permanently
import activities from '../assets/activities.jpeg'
import building from '../assets/building.jpg'
import ceremony from '../assets/ceremony.jpg'
import chairman from '../assets/chairman.jpg'
import christmas1 from '../assets/christmas-1.jpeg'
import christmas from '../assets/Christmas.jpeg'
import classroom from '../assets/Classroom.jpeg'
import danceRoom from '../assets/dance room.jpeg'
import dance from '../assets/dance.jpg'
import directorArjun from '../assets/director-arjun.jpg'
import directorShasi from '../assets/director-shasi.jpg'
import fancyDress from '../assets/Fancy Dress Competition.jpeg'
import founder from '../assets/founder.jpg'
import happyDiwali from '../assets/Happy diwali.jpeg'
import indoorplay1 from '../assets/indoorplay1.jpg'
import indoorplay2 from '../assets/indoorplay2.jpg'
import innovation24 from '../assets/innovatn-24.jpeg'
import karate1 from '../assets/karate-1.jpeg'
import karate2 from '../assets/karate-2.jpeg'
import karate from '../assets/karate.jpeg'
import mathslab from '../assets/mathslab.jpg'
import outdoorPlay from '../assets/outplay.jpg'
import physicalEducation from '../assets/Physical education.jpeg'
import pledge from '../assets/plegde.jpeg'
import prayerPledge from '../assets/prayer-pledge.jpeg'
import principal from '../assets/principal.jpg'
import projects from '../assets/projects.jpeg'
import roboticsExclamation from '../assets/ROBOTICS !.jpeg'
import robotics from '../assets/Robotics.jpeg'
import roboticsLab from '../assets/robotics.jpg'
import secretary from '../assets/secretary.jpg'
import studentsEating from '../assets/students eating.jpeg'
import studentsGivingGifts from '../assets/students giving gifts.jpeg'
import studentsMakesProject from '../assets/students makes project.jpeg'
import studentsParticipated from '../assets/students particiapted.jpeg'
import studentsSliding from '../assets/students sliding on slide.jpeg'
import teachersDay9 from '../assets/TEACHERS DAY 9th Students.jpg'
import teachersDay1 from '../assets/teachers day-1.jpeg'
import teachersDayDash1 from '../assets/TEACHERS DAY-1.jpg'
import tennisIndoor from '../assets/tennis indoor.jpeg'
import track from '../assets/track.jpg'
import worldEarthDay from '../assets/World Earth Day.jpg'

const LOCAL_PHOTOS = [
  { id: 'local-1', src: activities, title: 'Activities' },
  { id: 'local-2', src: building, title: 'School Building' },
  { id: 'local-3', src: ceremony, title: 'Ceremony' },
  { id: 'local-4', src: chairman, title: 'Chairman' },
  { id: 'local-5', src: christmas1, title: 'Christmas' },
  { id: 'local-6', src: christmas, title: 'Christmas Celebration' },
  { id: 'local-7', src: classroom, title: 'Classroom' },
  { id: 'local-8', src: danceRoom, title: 'Dance Room' },
  { id: 'local-9', src: dance, title: 'Dance' },
  { id: 'local-10', src: directorArjun, title: 'Director' },
  { id: 'local-11', src: directorShasi, title: 'Director' },
  { id: 'local-12', src: fancyDress, title: 'Fancy Dress Competition' },
  { id: 'local-13', src: founder, title: 'Founder' },
  { id: 'local-14', src: happyDiwali, title: 'Diwali Celebration' },
  { id: 'local-15', src: indoorplay1, title: 'Indoor Play' },
  { id: 'local-16', src: indoorplay2, title: 'Indoor Play' },
  { id: 'local-17', src: innovation24, title: 'Innovation 24' },
  { id: 'local-18', src: karate1, title: 'Karate' },
  { id: 'local-19', src: karate2, title: 'Karate' },
  { id: 'local-20', src: karate, title: 'Karate' },
  { id: 'local-21', src: mathslab, title: 'Maths Lab' },
  { id: 'local-22', src: outdoorPlay, title: 'Outdoor Play' },
  { id: 'local-23', src: physicalEducation, title: 'Physical Education' },
  { id: 'local-24', src: pledge, title: 'Pledge' },
  { id: 'local-25', src: prayerPledge, title: 'Prayer & Pledge' },
  { id: 'local-26', src: principal, title: 'Principal' },
  { id: 'local-27', src: projects, title: 'Student Projects' },
  { id: 'local-28', src: roboticsExclamation, title: 'Robotics' },
  { id: 'local-29', src: robotics, title: 'Robotics' },
  { id: 'local-30', src: roboticsLab, title: 'Robotics Lab' },
  { id: 'local-31', src: secretary, title: 'Secretary' },
  { id: 'local-32', src: studentsEating, title: 'Students' },
  { id: 'local-33', src: studentsGivingGifts, title: 'Students Giving Gifts' },
  { id: 'local-34', src: studentsMakesProject, title: 'Student Project' },
  { id: 'local-35', src: studentsParticipated, title: 'Student Participation' },
  { id: 'local-36', src: studentsSliding, title: 'Outdoor Activities' },
  { id: 'local-37', src: teachersDay9, title: "Teachers' Day" },
  { id: 'local-38', src: teachersDay1, title: "Teachers' Day" },
  { id: 'local-39', src: teachersDayDash1, title: "Teachers' Day" },
  { id: 'local-40', src: tennisIndoor, title: 'Indoor Tennis' },
  { id: 'local-41', src: track, title: 'Athletics Track' },
  { id: 'local-42', src: worldEarthDay, title: 'World Earth Day' },
]

function formatSupabasePhoto(photo) {
  return {
    id: `supabase-${photo.id}`,
    src: photo.file_url,
    title: photo.title || 'School Gallery',
  }
}

export default function Gallery() {
  const [supabasePhotos, setSupabasePhotos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadGallery() {
      const { data, error } = await supabase
        .from('documents')
        .select('*')
        .eq('category', 'gallery')
        .order('created_at', { ascending: false })

      if (!error && data) {
        setSupabasePhotos(data.map(formatSupabasePhoto))
      }

      setLoading(false)
    }

    loadGallery()
  }, [])

  const photos = [...LOCAL_PHOTOS, ...supabasePhotos]

  return (
    <main className="min-h-screen bg-[#F1E9E3]">
      <section className="px-5 pb-10 pt-28 md:px-8 md:pb-14 md:pt-36">
        <div className="mx-auto max-w-7xl">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-3 text-xs uppercase tracking-[0.25em] text-[#C98F9A]"
          >
            Life at Linga
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="font-display text-4xl leading-tight text-[#292629] sm:text-5xl md:text-6xl"
            style={{
              fontFamily: 'Georgia, "Times New Roman", serif',
              fontWeight: 600,
            }}
          >
            Gallery
          </motion.h1>

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 48 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-5 h-[2px] bg-[#C6A66B]"
          />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-5 max-w-2xl text-sm leading-6 text-[#716A6C] md:text-base"
          >
            Explore memorable moments, learning experiences,
            celebrations, activities, sports and everyday life
            at Linga Global School.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-5 text-xs uppercase tracking-[0.18em] text-[#716A6C]"
          >
            {loading
              ? 'Loading…'
              : `${photos.length} ${
                  photos.length === 1 ? 'photo' : 'photos'
                }`}
          </motion.p>
        </div>
      </section>

      <section className="px-5 pb-24 md:px-8 md:pb-32">
        {!loading && photos.length === 0 && (
          <p className="mx-auto max-w-7xl text-sm text-[#716A6C]">
            No photos added yet.
          </p>
        )}

        <div className="mx-auto max-w-7xl columns-1 gap-4 sm:columns-2 lg:columns-3 xl:columns-4">
          {photos.map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.08 }}
              transition={{
                duration: 0.55,
                delay: Math.min(index * 0.025, 0.25),
              }}
              className="group relative mb-4 break-inside-avoid overflow-hidden rounded-xl bg-[#F1E9E3]"
            >
              <img
                src={photo.src}
                alt={photo.title}
                loading="lazy"
                className="block h-auto w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              <div className="absolute left-0 right-0 top-0 h-[2px] origin-left scale-x-0 bg-[#C6A66B] transition-transform duration-500 group-hover:scale-x-100" />

              <div className="absolute bottom-0 left-0 right-0 translate-y-3 p-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                <p className="text-sm font-medium capitalize !text-[#C98F9A]">
                  {photo.title}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  )
}