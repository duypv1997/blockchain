<?php
namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class SendAuthCode extends Mailable
{
    use Queueable, SerializesModels;

    protected $params;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(array $params)
    {
        $this->params = $params;
    }


    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
    return $this->markdown('emails.send_auth_code')
                ->with('params',$this->params);
    }
}
