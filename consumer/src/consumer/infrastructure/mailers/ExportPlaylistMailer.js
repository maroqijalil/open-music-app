class ExportPlaylistMailer {
  constructor(mailer) {
    this.mailer = mailer;
  }

  send(targetEmail, content) {
    const message = {
      from: 'Open Music Apps',
      to: targetEmail,
      subject: 'Ekspor Playlist',
      text: 'Terlampir hasil dari ekspor playlist',
      attachments: [
        {
          filename: 'playlist.json',
          content,
        },
      ],
    };

    return this.mailer.send(message);
  }
}

export default ExportPlaylistMailer;
