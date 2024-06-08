import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import cardValidator from "card-validator";
import { Link } from "react-router-dom";
import { RxArrowTopRight } from "react-icons/rx";

const PaymentPage = () => {
  const [cardType, setCardType] = useState(""); // State to store the card type

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitSuccessful, isSubmitting },
    reset,
    watch,
  } = useForm();

  const watchCardNumber = watch("cardNumber"); // Watch the card number input

  const onSubmit = async (data) => {
    console.log("Payment Data:", data);
    await new Promise((resolve) => setTimeout(resolve, 3000));
    // setShowSuccessMessage(true);
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      setShowSuccessMessage(true);
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  useEffect(() => {
    if (isSubmitting) {
      setShowSuccessMessage(false);
    }
  }, [isSubmitting]);

  // Function to format card number
  const formatCardNumber = (event) => {
    let { value } = event.target;
    value = value
      .replace(/\D/g, "")
      .replace(/(\d{4})(?=\d)/g, "$1-") // Add dash every four digits
      .substring(0, 19); // Limit length including dashes
    setValue("cardNumber", value, { shouldValidate: true });
  };

  //func to format cvv
  const formatCVV = (event) => {
    let { value } = event.target;
    value = value.replace(/\D/g, "");
    setValue("cvv", value, { shouldValidate: true });
  };
  return (
    <div className="flex items-center justify-center min-h-screen min-w-[350px] px-1">
      <div>
        <Link to="/cart" className="inline-block">
          <button className="flex group justify-center items-center gap-1 text-xl text-amber-500 bg-indigo-600 p-2 rounded-md hover:bg-indigo-700 mb-2 mr-auto">
            BACK TO CART <RxArrowTopRight className="group-hover:rotate-45" />
          </button>
        </Link>
        <div className="w-[500px] mx-auto p-4 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Payment Information</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label
                htmlFor="firstname"
                className="block text-sm font-medium text-gray-700"
              >
                First Name
              </label>
              <input
                id="firstname"
                {...register("firstName", {
                  required: "First name is required",
                })}
                placeholder="John"
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
              {errors.firstName && (
                <span className="text-red-500">{errors.firstName.message}</span>
              )}

              <label
                htmlFor="lastname"
                className="block text-sm font-medium text-gray-700"
              >
                Last Name
              </label>
              <input
                id="lastname"
                {...register("lastName", { required: "Last name is required" })}
                placeholder="Doe"
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
              {errors.lastName && (
                <span className="text-red-500">{errors.lastName.message}</span>
              )}

              <label
                htmlFor="cardnumber"
                className="block text-sm font-medium text-gray-700"
              >
                Card Number
              </label>
              <input
                id="cardnumber"
                type="text"
                placeholder="1234-5678-9012-3456"
                {...register("cardNumber", {
                  required: "Card number is required",
                  validate: (value) => {
                    const num = value.replace(/\D/g, "");
                    const validation = cardValidator.number(num);
                    setCardType(validation.card ? validation.card.type : "");
                    return (
                      (validation.isValid && num.length === 16) ||
                      "This is not a valid card number. Card number must be 16 digits"
                    );
                  },
                })}
                onChange={formatCardNumber}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
              {errors.cardNumber && (
                <span className="text-red-500">
                  {errors.cardNumber.message}
                </span>
              )}

              {/* removed &&cardType because didnt seem like we need it */}
              {!errors.cardNumber && watchCardNumber && (
                <span className="text-green-500 block">
                  Card Type: {cardType.toUpperCase()}
                </span>
              )}

              <label
                htmlFor="cvv"
                className="block text-sm font-medium text-gray-700"
              >
                CVV
              </label>
              <input
                id="cvv"
                type="text"
                maxLength={3}
                placeholder="123"
                {...register("cvv", {
                  required: "3 digit CVV is required - must be numbers only",
                  maxLength: {
                    value: 3,
                    message: "CVV must be exactly 3 digits",
                  },
                })}
                className="block w-1/6 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-center"
                onChange={formatCVV}
              />
              {errors.cvv && (
                <span className="text-red-500">{errors.cvv.message}</span>
              )}
            </div>

            {isSubmitting && (
              <p className="text-gray-500">Processing payment...</p>
            )}
            {showSuccessMessage && (
              <p className="text-green-500">Payment successful!</p>
            )}

            <div className="w-full flex gap-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-4 py-2 text-white bg-blue-500 rounded-md shadow-md hover:bg-blue-600"
              >
                Submit Payment
              </button>
              <Link to="/" className="w-full">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-4 py-2 text-white bg-red-500 rounded-md shadow-md hover:bg-red-600"
                >
                  Cancel Payment
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
