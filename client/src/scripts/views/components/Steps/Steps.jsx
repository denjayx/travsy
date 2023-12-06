import Paragraph from '../Paragraph/Paragraph'
import Step1Image from '../../../../assets/images/step1.png'
import Step2Image from '../../../../assets/images/step2.png'
import Step3Image from '../../../../assets/images/step3.png'
import StepsCard from './StepsCard'

const Steps = () => {
  const steps = [
    {
      image: Step1Image,
      title: 'Pilih Destinasi',
      description:
        'Jelajahi keindahan pulau bali dengan pilihan destinasi menarik dari kami. Setiap tempat memiliki cerita dan keunikan tersendiri yang menunggu untuk Anda temukan.Yuk segera pesan layanan kami.',
    },
    {
      image: Step2Image,
      title: 'Pembayaran Online',
      description:
        'Dengan pembayaran online, Anda dapat mengelola semua transaksi keuangan Anda dengan mudah. Hemat waktu, tanpa perlu membawa uang tunai, dan dapat diakses 24/7.',
    },
    {
      image: Step3Image,
      title: 'Mulai Perjalanan',
      description:
        'Nikmati perjalanan tanpa kerumitan dengan layanan travel kami. Kami hadir untuk membuat setiap perjalanan Anda menjadi pengalaman yang mudah dan menyenangkan',
    },
  ]
  return (
    <section className="container mt-24 space-y-6">
      <div className="mx-auto space-y-4 text-center lg:w-10/12 xl:w-6/12">
        <h3 className="text-xl font-bold text-primary-950">3 Langkah Mudah?</h3>
        <Paragraph>
          Kesulitan dalam memesan paket liburan sudah tidak jaman! Hanya dengan
          tiga langkah mudah Anda bisa memulai liburan.Aku enggak perna
        </Paragraph>
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        {steps.map((step, index) => (
          <StepsCard
            key={index}
            image={step.image}
            title={step.title}
            description={step.description}
          />
        ))}
      </div>
    </section>
  )
}

export default Steps
