function ValidateInput(name,email,password,isSignin){
    if(!isSignin){
        const validName = /^[a-zA-Z]{2,40} [a-zA-Z]{2,40}$/.test(name);
        if(!validName){
            return "Please, give valid full name"
        }
    }
    const validEmail= /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)
    if(!validEmail){
        return "Please, give valid email"
    }
    const validPassword=/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/.test(password)
    if(!validPassword)
        return "Password  Should have one digit, one lowercase letter, one uppercase letter, one special character, of length 8-16 char"
    
    return null;
}

export default ValidateInput;