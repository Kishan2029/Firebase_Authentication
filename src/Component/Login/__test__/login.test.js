import { render, screen,fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'
import Login from "../Login"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { authMock } from '../../../__mocks__/mock_firebase';
import Firebase from './firebase';
Firebase.auth = authMock;
console.log("Firebase-1",Firebase.auth().signInWithEmailAndPassword)

const MockLogin = () => {
    return (
        <BrowserRouter>
             <Login/>
        </BrowserRouter>
  
    )
}
describe("test case for login page", () => {
    test('email and password button should be rendered', () => {
        render(<MockLogin />);
        
        const emailInputElememt = screen.getByLabelText(/Email Address/i);
        const passwordInputElememt = screen.getByLabelText(/password/i);
        expect(emailInputElememt).toBeInTheDocument();
        expect(passwordInputElememt).toBeInTheDocument();

        // write data
        fireEvent.change(emailInputElememt, { target: { value: "kishan@gmail.com" } });
        fireEvent.change(passwordInputElememt, { target: { value: "123456" } });

        const saveButton = screen.getByRole("button",{name:"Login"});
        // const saveButton = screen.getAllByTestId("login-1")
        // console.log(saveButton)
        fireEvent.click(saveButton);
        expect(Firebase.auth().getAuth()).toHaveBeenCalled();

        // screen.debug()
        // const passwordInputElememt = screen.getByLabelText(/password/i);
        // expect(.firstChild).toHaveClass('foo')
        

    });
})

