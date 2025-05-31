const FormPage = () => {
    return (
        <>
        {/* show page with embed */}
        <div className="flex items-center justify-center h-screen w-screen bg-[#F5F5FF] px-[10vw] py-[5vh]">
            <iframe
                src="https://tally.so/embed/mO9r7A?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
                className="w-full h-full border-none"
                title="Print Request Form"
            ></iframe>
        </div>
        </>
    )
}
export default FormPage;