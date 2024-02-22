import React from 'react'

export default function MainPage() {
  return (
    <div className="grid text-800 mx-8">
      <div className="col-4 m-auto select-none">
        <h1>Lorem Ipsum</h1>
        <p className="line-height-3 select-none">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad adipisci
          dolores eos nostrum, nemo veritatis facilis expedita quos laboriosam
          ullam distinctio fugiat architecto cum amet voluptas, eligendi
          consequatur praesentium soluta? Doloremque pariatur totam ex? Dicta
          odit veritatis reiciendis dignissimos delectus aut atque eveniet,
          nobis quo quisquam dolorum doloremque ullam totam consectetur in id
          repellendus vitae ut dolore itaque asperiores enim!
        </p>
      </div>
      <div className="col-8">
        <img
          className="select-none"
          src="main-page.svg"
          alt="main-page"
          width="1250"
        />
      </div>
    </div>
  )
}
