import 'twin.macro'

const Stats = ({ title, timeProcess }: { title: string; timeProcess: string }) => (
  <div tw="p-5 flex-wrap flex items-center gap-2 justify-center">
    <div tw="bg-gradient-to-r flex-auto from-red-900 to-red-800 shadow-lg rounded-sm">
      <div tw="md:p-7 p-4">
        <h2 tw="text-xl text-center text-white capitalize">{title}</h2>
        <h3 tw="text-sm text-white text-center uppercase">{timeProcess}</h3>
      </div>
    </div>
  </div>
)

export default Stats
