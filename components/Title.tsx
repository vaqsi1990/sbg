

function Title({ title1,  } : {title1:string,  }) {
  return (
<div className="section-header">
 
  <div className="title-wrapper">
    <div className="line"></div>
    <h2 className="text-2xl lg:mt-[30px] lg:mb-[40px] lg:text-[40px] leading-tight font-semibold mb-4 max-w-full text-center">{title1}</h2>
  
  </div>
</div>

  )
}

export default Title